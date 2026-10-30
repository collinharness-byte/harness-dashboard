import { Component } from 'react'
export default class AppErrorBoundary extends Component {
  state = {error:null}
  static getDerivedStateFromError(error) { return {error} }
  render() {
    if (!this.state.error) return this.props.children
    return <div className="signed-out"><section className="panel" role="alert"><div className="eyebrow">TOURLINE</div><h1>We couldn’t load this page</h1><p>Your saved workspace has not been deleted. Try reloading the app. If the problem continues, share the error below with support.</p><details><summary>Error details</summary><pre style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere',fontSize:12}}>{this.state.error.message}</pre></details><div className="form-actions"><button onClick={()=>window.location.reload()}>Reload app</button><button className="primary" onClick={()=>{try{sessionStorage.removeItem('tourline-session');window.location.reload()}catch{this.setState({error:new Error('Browser storage is unavailable. Allow site storage and reload the app.')})}}}>Return to login</button></div></section></div>
  }
}
