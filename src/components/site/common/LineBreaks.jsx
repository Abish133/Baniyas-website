import { Fragment } from 'react';

/** Renders lines of text with a <br /> between them (address, badge text). */
export default function LineBreaks({ lines }) {
  return lines.map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}
