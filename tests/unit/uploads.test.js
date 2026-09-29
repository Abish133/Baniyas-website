import { describe, expect, it } from 'vitest';
import sharp from 'sharp';
import { inspectImage, inspectVideo } from '@/lib/uploads';
import { IMAGE_RULES, VIDEO_RULES, checkImage } from '@/lib/validation/image-rules';

const fileOf = (buffer, name, type) => new File([buffer], name, { type });
const jpeg = (width, height) => sharp({ create: { width, height, channels: 3, background: '#c0c0c0' } }).jpeg().toBuffer();

describe('Image upload checks (real file bytes)', () => {
  it('accepts a valid photo', async () => {
    const result = await inspectImage(fileOf(await jpeg(1600, 1200), 'a.jpg', 'image/jpeg'), IMAGE_RULES.portfolioProject);
    expect(result.error).toBeUndefined();
    expect(result.image).toMatchObject({ ext: 'jpg', width: 1600, height: 1200, maxSide: 2000 });
  });

  it('rejects a non-image renamed to .jpg', async () => {
    const result = await inspectImage(fileOf(Buffer.from('<?php echo 1; ?>'), 'evil.jpg', 'image/jpeg'), IMAGE_RULES.portfolioProject);
    expect(result.error).toMatch(/not a valid image/);
  });

  it('rejects an image that is too small', async () => {
    const result = await inspectImage(fileOf(await jpeg(100, 100), 'a.jpg', 'image/jpeg'), IMAGE_RULES.portfolioProject);
    expect(result.error).toMatch(/too small/);
  });

  it('checks the shape (aspect ratio) where a section needs it', () => {
    const square = checkImage({ size: 1000, type: 'image/jpeg', width: 1000, height: 1000 }, IMAGE_RULES.servicesSection);
    expect(square).toMatch(/wrong shape/);
  });

  it('keeps more pixels for the organisation chart', async () => {
    const png = await sharp({ create: { width: 1000, height: 1400, channels: 3, background: '#fff' } }).png().toBuffer();
    const result = await inspectImage(fileOf(png, 'chart.png', 'image/png'), IMAGE_RULES.orgChart);
    expect(result.image.maxSide).toBe(3000);
  });
});

describe('Video upload checks', () => {
  it('recognises MP4 from its bytes', async () => {
    const mp4 = Buffer.concat([Buffer.from([0, 0, 0, 0x18]), Buffer.from('ftypmp42'), Buffer.alloc(32)]);
    const result = await inspectVideo(fileOf(mp4, 'v.mp4', 'video/mp4'), VIDEO_RULES.homeBanner);
    expect(result.image).toMatchObject({ ext: 'mp4' });
  });

  it('rejects other files named .mp4', async () => {
    const result = await inspectVideo(fileOf(Buffer.from('not a video at all'), 'v.mp4', 'video/mp4'), VIDEO_RULES.homeBanner);
    expect(result.error).toMatch(/MP4 or WEBM/);
  });
});
