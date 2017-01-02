import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import MyComponent from '../../app/components/MyComponent';
import MyChild from '../../app/components/MyChild';

describe('A suite', function() {
  it('is the expected class', function() {
    expect(shallow(<MyComponent />).is('.my-component')).to.equal(true);
  });

  it('the my-component class is applied only one time', function() {
    expect(mount(<MyComponent />).find('.my-component').length).to.equal(1);
  });
});

describe('Find methods (find, filter, at index, etc)', () => {
  let myShallowWrapper;
  let myDOMwrapper;

  beforeEach(() => {
    myShallowWrapper = shallow(<MyComponent />);
    myDOMwrapper = mount(<MyComponent />);
  });

  it('should find a css class', () => {
    expect(myShallowWrapper.find('.my-component')).to.have.length(1);
    expect(myDOMwrapper.find('.my-component')).to.have.length(1);
  });

  it('should find that a css class occurs 3 times', () => {
    expect(myShallowWrapper.find('.repeated-class')).to.have.length(3);
    expect(myDOMwrapper.find('.repeated-class')).to.have.length(3);
  });

  it('should find a child component', () => {
    expect(myShallowWrapper.find(MyChild)).to.have.length(1);
    expect(myDOMwrapper.find(MyChild)).to.have.length(1);
  });

  it('should find a child component by name', () => {
    expect(myShallowWrapper.find('MyChild')).to.have.length(1);
    expect(myDOMwrapper.find('MyChild')).to.have.length(1);
  });

  it('should find the number of filtered items', () => {
    expect(myShallowWrapper.find('.repeated-class').filter('.unique')).to.have.length(1);
    expect(myDOMwrapper.find('.repeated-class').filter('.unique')).to.have.length(1);
  });

  it('should find the number of negative-filetered items', () => {
    expect(myShallowWrapper.find('.repeated-class').not('.unique')).to.have.length(2);
    expect(myDOMwrapper.find('.repeated-class').not('.unique')).to.have.length(2);
  });

  it('should find the value of the first item', () => {
    expect(myShallowWrapper.find('MyChild').first()).to.have.length(1);
    expect(myDOMwrapper.find('MyChild').first()).to.have.length(1);
  });

});

describe('Contain methods (contains, equals, matches, etc)', () => {
  let myShallowWrapper;
  let myDOMwrapper;

  beforeEach(() => {
    myShallowWrapper = shallow(<MyComponent />);
    myDOMwrapper = mount(<MyComponent />);
  });

  it('should contain a MyChild element', () => {
    expect(myShallowWrapper.contains(<MyChild />)).to.equal(true);
    expect(myDOMwrapper.contains(<MyChild />)).to.equal(true);
  });

  it('should contain the described p elements', () => {
    expect(myShallowWrapper.contains([
      <p className="repeated-class unique">1</p>,
      <p className="repeated-class">2</p>
    ])).to.equal(true);
    expect(myDOMwrapper.contains([
      <p className="repeated-class unique">1</p>,
      <p className="repeated-class">2</p>
    ])).to.equal(true);
  });

  it('DIFFERENT BEHAVIOR: should have class my-component. Different behavior for DOM copy', () => {
    expect(myShallowWrapper.hasClass('my-component')).to.equal(true);
    expect(myDOMwrapper.find('.my-component').hasClass('my-component')).to.equal(true);
  });

  it('the h3 element should have the class exclusive', () => {
    expect(myShallowWrapper.find('h3').hasClass('exclusive')).to.equal(true);
    expect(myDOMwrapper.find('h3').hasClass('exclusive')).to.equal(true);
  });

  it('DIFFERENT BEHAVIOR: the shallow copy has the type of div, the DOM copy has a type of the component', () => {
    expect(myShallowWrapper.type()).to.equal('div');
    expect(myDOMwrapper.type()).to.equal(MyComponent);
  });

});

describe('Children and parent methods', () => {
  let myShallowWrapper;
  let myDOMwrapper;

  beforeEach(() => {
    myShallowWrapper = shallow(<MyComponent />);
    myDOMwrapper = mount(<MyComponent />);
  });

  it('the ul element has 2 children', () => {
    expect(myShallowWrapper.find('ul').children()).to.have.length(2);
    expect(myDOMwrapper.find('ul').children()).to.have.length(2);
  });

  it('the li element has ul as parent', () => {
    expect(myShallowWrapper.find('li').parent().is('ul')).to.equal(true);
    expect(myDOMwrapper.find('li').parent().is('ul')).to.equal(true);
  });


});

describe('Cheerio Wrapper', () => {
  let myShallowWrapper;
  let myDOMwrapper;

  beforeEach(() => {
    myShallowWrapper = shallow(<MyComponent />);
    myDOMwrapper = mount(<MyComponent />);
  });

  it('should find a h5 element inside a Cheerio Wraper', () => {
    expect(myShallowWrapper.render(MyChild).find('h5')).to.have.length(1);
    expect(myDOMwrapper.render(MyChild).find('h5')).to.have.length(1);
  });

});

describe('State and props methods', () => {
  let myShallowWrapper;
  let myDOMwrapper;

  beforeEach(() => {
    myShallowWrapper = shallow(<MyComponent name="Napoleon"/>);
    myDOMwrapper = mount(<MyComponent name="Napoleon"/>);
  });

  it('should have the expected state', () => {
    expect(myShallowWrapper.state('word')).to.equal('secret');
    expect(myDOMwrapper.state('word')).to.equal('secret');
  });

  it('the shallow component should have the expected prop', () => {
    expect(myShallowWrapper.prop('name')).to.equal('Napoleon');
    expect(myDOMwrapper.prop('name')).to.equal('Napoleon');
  });

});

describe('Simulate events', () => {
  let myShallowWrapper;
  let myDOMwrapper;

  beforeEach(() => {
    myShallowWrapper = shallow(<MyComponent />);
    myDOMwrapper = mount(<MyComponent />);
  });
  it('on input change, it should update state', () => {
    expect(myShallowWrapper.state('word')).to.equal('secret');
    myShallowWrapper.find('input').simulate('change', { target: { value: 'not secret' } });
    expect(myShallowWrapper.state('word')).to.equal('not secret');
    expect(myDOMwrapper.state('word')).to.equal('secret');
    myDOMwrapper.find('input').simulate('change', { target: { value: 'not secret' } });
    expect(myDOMwrapper.state('word')).to.equal('not secret');
  });
});
