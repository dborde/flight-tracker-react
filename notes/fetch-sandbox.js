class UnsignedOrders extends React.Component {
	constructor(props) {
		super(props)
		this.state = { data: [] }
	}
	
	loadData() {
		fetch('example.com/api/orders/unsigned')
			.then(response => response.json())
			.then(data => {
				this.setState({data: data })
		})
			.catch(err => console.error(this.props.url, err.toString()))
	}

	
	componentDidMount() {
		this.loadData()
	}
	
  render() {
    return <ul>
			<li className='title'>
				<span>Sales Order</span>
				<span>Dealer Name</span>
				<span>Product</span>
				<span>Signature</span>
			</li>
      { this.state.data.map((item, i) => {
				let statusClass = 'sign'
				if (item.signStatus === 'Out for signature') statusClass += ' sign-complete'
				let boundClick = this.signOrder.bind(this, i)
				return <li className='item'>
					<span>{item.orderID}</span>
					<span>{item.dealerName}</span>
					<span>{item.model}</span>
					<span><span className={statusClass} onClick={() => this.signOrder(item.orderID)}>{item.signStatus}</span></span>
				</li>
        })
      }
    </ul>;
  }
}
			
ReactDOM.render(<UnsignedOrders />, document.getElementById('app'));
