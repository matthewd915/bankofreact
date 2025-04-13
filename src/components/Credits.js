/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';

const Credits = (props) => {

  const handleAdd = (e) => {
    e.preventDefault();
    // we're not displaying id, so just use an arbitrary number
    const new_credit = {
      id:0,
      description: e.target.elements.description.value,
      amount: e.target.elements.amount.value,
      date: new Date().toISOString()
    }

    props.addCredit(new_credit);
    e.target.reset();
  }

  let creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {
      let date = credit.date.slice(0, 10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    })
  }
  return (
    <div>
      <h1>Credits</h1>
      {creditsView()}

      <form onSubmit={handleAdd}>
        <input type="text" name="description" />
        <input type="number" name="amount" />
        <button type="submit">Add Credit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;