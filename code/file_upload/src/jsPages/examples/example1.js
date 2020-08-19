import React from "react";
import { Form, Input, Button } from 'antd';


class Example1 extends React.Component{
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }
    onReset = () => {
        this.formRef.current.resetFields();
    };

    onFill = () => {
        this.formRef.current.setFieldsValue({
            note: 'Hello world!',
        });
    };
    render() {
        return (
            <Form ref={this.formRef} name="control-ref">
                <Form.Item name="note" label="Note">
                    <Input />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={this.onReset}>
                        Reset
                    </Button>
                    <Button type="link" htmlType="button" onClick={this.onFill}>
                        Fill form
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Example1;