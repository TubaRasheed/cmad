import React from 'react'
import Firebase from "firebase";
import FirebaseConfig from '../components/Firebase/firebase'

class Comment extends React.Component{
    constructor(props) {
        super(props);
        //Firebase.initializeApp(FirebaseConfig);
        this.state = {
          value: '',
          items: [],
          users:[],
          deleteItem : function(){
          }      
        };
        this.saveData = this.saveData.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.readFromFirebase()
        this.usernameFromFirebase()
      }
      writeInFirebase () {
        console.log(this.state.items, "data")
        Firebase.database().ref('todos/').set({
          todos : this.state.items,
          
        });
      }
      readFromFirebase () {
        Firebase.database().ref('/todos/').once('value').then((snapshot) => {
          console.log(snapshot.val().todos, "value")
           this.setState({
             items : snapshot.val().todos
            
           })
        });
      }
      usernameFromFirebase(){
        Firebase.database().ref('/users').once('value').then((snapshot) => {
          console.log(snapshot.val().username, "value")
           this.setState({
             users : snapshot.val().username
           })
        });
      }
      onChange = (event) => {
        this.setState({ value: event.target.value });
      }
    saveData(e){
        e.preventDefault()
        if(this.state.todo == ""){
          alert('Data Missing')
        }
        else {
          //console.log(this.state.value);
          this.setState({
            items : [...this.state.items, this.state.value]
          }, this.writeInFirebase)
          this.state.value = ""
        }
      }
    deleteItem(i){

        var deleteData = this.state.items.splice(i, 1)
        console.log(deleteData);
        this.setState({
          items : this.state.items
        },this.writeInFirebase)
      }
    render(){
      // var uid = Firebase.database().ref(`profles/${userId}`);
      // console.log(uid);
      console.log(this.state.users)
        return(
          <div>
          <form onSubmit={this.saveData}>
          <input placeholder='Write Comment' value={this.state.value} onChange={this.onChange} />
          <button>Add</button>
        </form>

     {
      this.state.items.map((item, index) => <div>
        <p key={index}>{item}</p>
        <button onClick={() => this.state.deleteItem(item)}>DELETE</button>
      </div>
    )
    }

</div>
);
}
}

export default Comment;