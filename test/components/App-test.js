import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import App from '../../app/components/App';

describe('App', () => {
  it('should exist', () => {
    let app = shallow(<App />);
    expect(app.find('.my-app')).to.have.length(1);
  });
});
