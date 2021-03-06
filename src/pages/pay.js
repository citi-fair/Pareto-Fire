import React from 'react'
import { Button, Checkbox, Form, Header, Input } from 'semantic-ui-react'

export default class Pay extends React.Component {
  constructor(props) {
    super(props)

    if (typeof window !== 'undefined') {
      this.state = {
        amount: new window.URLSearchParams(window.location.search).get('amount'),
        payingAmount: new window.URLSearchParams(window.location.search).get('amount'),
      }
    } else {
      this.state = {
        amount: 0,
        payingAmount: 0,
      }
    }

    this.payWithPoints = this.payWithPoints.bind(this)
  }

  payWithPoints() {
    this.setState({
      amount: Number(new window.URLSearchParams(window.location.search).get('amount')) - 200,
      payingAmount: new window.URLSearchParams(window.location.search).get('amount') - 200,
    })
  }

  handleChange(event, { name, value }) {
    this.setState({
      [name]: value,
    })
  }


  render() {
    return <div>
      <Header>应还款：{this.state.amount} 元</Header>
      <Form>
        <Form.Field control={Checkbox} label={{ children: '使用花旗积分抵扣 200 元：' }} onClick={this.payWithPoints}/>
        <Form.Field label="请输入还款金额" control={Input} type="number" value={this.state.payingAmount}
                    onChange={this.handleChange}
                    name="payingAmount"/>
        <Form.Field control={Button}>花旗账户支付</Form.Field>
        <Form.Field control={Button}>支付宝支付</Form.Field>
        <Form.Field control={Button}>微信支付</Form.Field>
      </Form>
    </div>
  }
}