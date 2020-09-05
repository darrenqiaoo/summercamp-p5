import React, { Component } from 'react';
import Enzyme, {shallow,render,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../src/jsPages/login/login';        //待测试文件的路径；

Enzyme.configure({adapter: new Adapter()});


//整体测试；
describe('Login test', function () {
    it('Test for all functions', function(){
        const props = {
            setVisibility:jest.fn()
          };

        let wrapper = shallow(<Login {...props} />);
        wrapper.find('Modal').simulate('cancel');
        expect(props.setVisibility).toHaveBeenCalledWith(false);
    });

  });
