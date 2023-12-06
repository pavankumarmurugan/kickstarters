const genericTextfield = (props) => {
  <input placeholder={props?.placeholder} />;
};

export default genericTextfield;

export const userSpecificToken = () => {
  try {
    let getToken = localStorage.getItem("token");
    let token = JSON.parse(getToken);
    let geTokendata = Object.assign({}, token[0]);

    return geTokendata;
  } catch (error) {
    console.log(error);
  }
};

export const dateConverter = (date) => {
  const getDate = new Date(date.$d);
  const getMonth = new Date(getDate).getMonth() + 1;
  const getYear = new Date(getDate).getFullYear();
  const actualDate = `${getMonth}/${getYear}`;
  return actualDate;
};
