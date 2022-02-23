import React, { Component } from "react";
import axios from "axios"

class Fib extends Component {
     state = {
          seenIndexes: [],
          values: {},
          index: ''
     };

     componentDidMount() {
          this.fetchIndexes()
          this.fetchValues()
     }

     async fetchValues(){
          const values = await axios.get("/api/values/current");
          this.setState({values: values.data})
     }

     async fetchIndexes(){
          const indexes = await axios.get("/api/values/all")

          this.setState({seenIndexes: indexes.data})
     }

     handleSubmit = async (event) => {
          event.preventDefault();
          
          await axios.post("/api/value",{ index: this.state.index })

          this.setState({index: ""})
     }

     renderSeenIndexes(){
          return this.state.seenIndexes.map(({ number }) => number).join(", ")
     }
     renderValues(){
          const entries = []

          for ( let key in this.state.values ){
               entries.push(
                    <div key={key}>
                         For index {key} I Calculated { this.state.values[key]}
                    </div>
               )
          }

          return entries
     }

     render(){
          
        return (
             <div>
                 <form onSubmit={this.handleSubmit}>
                      <label>Enter your index</label>
                      <input value={ this.state.index } onChange={ event => this.setState({index: event.value})}></input>
                      <button>Submit</button>
                 </form>

                 <h3>Seen Indexex </h3>
                 { this.renderSeenIndexes() }

                 <h3>Calculated Values</h3>
                 { this.renderValues() }
             </div>
        )
     }
}

export default Fib;