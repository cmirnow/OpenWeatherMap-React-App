const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <span className="fixed-bottom badge bg-secondary link-action">
      Copyright &copy;
      <a
        alt="Masterpro Project"
        title="Masterpro Project"
        href="https://masterpro.ws/api-openweathermap-w3c-geolocation-api-reactjs"
        target="_blank"
        rel="noreferrer"
      >
        {`Masterpro.ws 2021 - ${year}`}
      </a>
    </span>
  );
};

export default Footer;
