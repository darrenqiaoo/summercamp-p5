import React, { Component } from 'react';
import Enzyme, {shallow,render,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Template from '../src/jsPages/template/template';        //待测试文件的路径；


Enzyme.configure({adapter: new Adapter()});


describe('shallow test', function () {
  it('toggle test', function(){
    let template = shallow(<Template/>);
    let res = template.instance().state.collapsed;
    template.instance().toggle();
    expect(template.instance().state.collapsed).toEqual(!res);
  });

  it('set page test', function(){
    let template = shallow(<Template/>);
    let page = "page";
    template.instance().setPage(page)
    expect(template.instance().state.curPage).toEqual(page);
  });

  it('set files test', function(){
    let template = shallow(<Template/>);
    let files = "file";
    template.instance().setFiles(files)
    expect(template.instance().state.files).toEqual(files);
  });

})
