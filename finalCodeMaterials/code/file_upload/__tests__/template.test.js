import React, { Component } from 'react';
import Enzyme, {shallow,render,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyTemplate from '../src/jsPages/template/template';        //待测试文件的路径；

Enzyme.configure({adapter: new Adapter()});

//整体测试；
describe('MyTemplate test', function () {
  it('Test for all functions', function(){

    let mytemplate = shallow(<MyTemplate/>);

    mytemplate.instance().setPage("extract");
    expect(mytemplate.instance().state.curPage).toEqual("extract");

    mytemplate.instance().setFiles("test.txt");
    expect(mytemplate.instance().state.files).toEqual("test.txt");

    mytemplate.instance().setUserName("citrix");
    expect(mytemplate.instance().state.userName).toEqual("citrix");
    
    mytemplate.instance().handleResize({target: {innerHeight: "900"}});
    expect(mytemplate.instance().state.height).toEqual("900");

    mytemplate.instance().loginVisibility();
    expect(mytemplate.instance().state.loginVisible).toEqual(undefined);

    mytemplate.find('button').simulate('click');
    expect(mytemplate.instance().state.loginVisible).toEqual(undefined);

    mytemplate.instance().handelLoginClick();
    mytemplate.find('.login').simulate('click');
    expect(mytemplate.instance().state.loginVisible).toEqual(true);


  });
});

