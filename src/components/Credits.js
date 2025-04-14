import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
import './Credits.css';

const Credits = (props) => {

  const handleAdd = (e) => {
    e.preventDefault();

    const desc = e.target.elements.description.value
    const amt = parseFloat(parseFloat(e.target.elements.amount.value).toFixed(2))

    if(!desc || !amt) return;

    // we're not displaying id, so just use an arbitrary number
    const new_credit = {
      id:0,
      description: desc,
      amount: amt,
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
    <div className = "credits-container">
      <h1 className = "title">Credits</h1>
      <h1 className="balance-display">
        <AccountBalance accountBalance={props.accountBalance} />
      </h1>
      <br/>
      {creditsView()}
      <br/>

      <form onSubmit={handleAdd} className = "form">
        <div>Enter Description Below:</div>
        <input type="text" name="description" />
        <div>Enter Amount Below:</div>
        <input type="number" name="amount" />
        <button type="submit">Add Credit</button>
      </form>
      <br/>
      <Link to="/" className = "link">Return to Home</Link>
    </div>
  );
}

export default Credits;