import { Fragment } from 'react';

/** Renders the admin-edited address, one <br /> between lines. */
export default function AddressLines({ lines }) {
  return lines.map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}
