import { Link } from 'react-router-dom'

function HomePane() {

  return (
    <div>
      <h1>Decentralized ID Demo</h1>
      <p>
        This page demonstrait what decentralized ID can.
      </p>
      <Link to='/key'>
        <h2>Key selection</h2>
      </Link>
      <Link to='/sign'>
      <h2>Sign and issue a credential</h2>
      </Link>
      <Link to='/verify'>
      <h2>verify credentials</h2>
      </Link>
    </div>
  );
}

export default HomePane;
