import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
import './Credits.css';

const Credits = (props) => {

  const handleAdd = (e) => {
    e.preventDefault();
    // we're not displaying id, so just use an arbitrary number
    const new_credit = {
      id:0,
      description: e.target.elements.description.value,
      amount: parseFloat(parseFloat(e.target.elements.amount.value).toFixed(2)),
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
      <div className="balance-display">
          <AccountBalance accountBalance={props.accountBalance} />
      </div>
      {creditsView()}

      <form onSubmit={handleAdd} className = "form">
        <input type="text" name="description" />
        <input type="number" name="amount" />
        <button type="submit">Add Credit</button>
      </form>
      <br/>
      <Link to="/" className = "link">Return to Home</Link>
    </div>
  );
}

export default Credits;