const Footer = () => {
  const startYear = 2022;
  const currentYear = new Date().getFullYear();
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
        Masterpro.ws{" "}
        {startYear === currentYear ? startYear : startYear + "-" + currentYear}
      </a>
    </span>
  );
};

export default Footer;
