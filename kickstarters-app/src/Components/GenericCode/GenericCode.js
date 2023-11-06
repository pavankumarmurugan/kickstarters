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
