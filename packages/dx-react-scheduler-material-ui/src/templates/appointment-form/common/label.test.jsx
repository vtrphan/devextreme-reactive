import * as React from 'react';
import { createShallow } from '@vtrphan/dx-testing';
import { TITLE } from '@vtrphan/dx-scheduler-core';
import { Label, classes } from './label';

describe('AppointmentForm common', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  describe('Label', () => {
    it('should pass rest props into the root element', () => {
      const tree = shallow((
        <Label data={{ a: 1 }} />
      ));

      expect(tree.prop('data'))
        .toMatchObject({ a: 1 });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <Label className="custom-class" />
      ));

      expect(tree.is(`.${classes.label}.custom-class`))
        .toBeTruthy();
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <Label type={TITLE} />
      ));

      expect(tree.is(`.${classes.label}.${classes.titleLabel}`))
        .toBeTruthy();
    });
  });
});
