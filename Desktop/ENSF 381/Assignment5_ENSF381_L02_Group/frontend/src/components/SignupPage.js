import React from 'react';
import Header from './Header';
import RegForm from './RegForm';
import Footer from './Footer';

const SignupPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <main style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          <h2 style={{ textAlign: 'center', color: '#004080', marginBottom: '30px' }}>
            Signup
          </h2>
          <RegForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;
