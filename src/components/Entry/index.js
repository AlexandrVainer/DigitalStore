import React from 'react';

class Entry extends React.Component {

  render() {
    return (
      <div className='overlay'>
        <div className='entry'>
          <div>
            <label for="user" className='mr-30'>User name:</label>
            <input type="text" id="userName" onChange={this.props.onChangeUserName} value={this.props.userName} placeholder='Enter user name' className='mr-30' />
          </div>
          <div>
            <label for="password" className='mr-30'>Password:</label>
            <input type="password" id="password" onChange={this.props.onChangePassword} value={this.props.password} placeholder='Enter password' className='mr-30' />
          </div>
          <button className="onClickEntry" onClick={this.props.onClickEntry}>Entry</button>
        </div>
      </div>
    );
  }

}

/*class Entry extends React.Component{

  constructor(props){
    super(props);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.state = {
      userName:'aa',
      password:'aa',
      position:'aa',};
  }

  onChangeUser(event){
    //userName=event.target.value;
    this.setState({userName: event.target.value});
  }

  onChangePassword(event){
    //password=event.target.value;
    this.setState({password: event.target.value});
  }

  onClickUser(event){
    alert('1');
    position ='';

    for(let user of file){
      if ((user.userName===userName) && (user.password===password))
        position=user.position;
    }
  alert('1');
  //this.setState({position: position});
  //this.props.onTemperatureChange(event.target.value);
  }

  render(){
    return(
      <div className='overlay'>
        <div className='entry'>
          <label for="user" className='mr-30'>User name:</label>
          <input type="text" id="userName" onChange="onChangeUser" value={userName} placeholder='Enter user name' className='mr-30'/>
          <label for="password" className='mr-30'>Password:</label>
          <input type="password" id="password"onChange="onChangePassword" value={password} placeholder='Enter password'  className='mr-30'/>
          <button className="onClickEntry" onClick="onClickUser">Entry</button>
        </div>
      </div>
    );
  }
}
*/
export default Entry;
