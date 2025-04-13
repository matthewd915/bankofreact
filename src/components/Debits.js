import {Link} from 'react-router-dom';
import { useState } from 'react';

const Debits = (props) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) {
      console.log("Please fill out description");
      return;
    }

    if (!amount) {
      console.log("Please fill out amount");
      return;
    }

    const data = {
      id: 0,
      description: description.trim(),
      amount: parseFloat(parseFloat(amount).toFixed(2)),
      date: new Date().toISOString()
    };

    props.addDebit(data);
    setDescription('');
    setAmount('');
  };

  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {
      let date = debit.date.slice(0, 10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>;
    });
  };

  return (
    <div>
      <h1>Debits</h1>
      {debitsView()}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          name="amount"
          value={amount}
          step="0.01"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">Add Debit</button>
      </form>

      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Debits;