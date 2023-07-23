import React from "react";

function Contacts() {
  const employees = [
    { id: 1, name: "Alice", country: "Canada" },
    { id: 2, name: "Bob", country: "Belgium" },
    { id: 3, name: "Carl", country: "Canada" },
    { id: 4, name: "Dean", country: "Germany" },
  ];

  const ENUM_STATES = {
    foo: "<Foo />",
    bar: "<Bar />",
    default:"<Default />"
  };

  return (
    <>     
   {  
      employees      
        .filter((item) => item.name === "Alice")
        .map((item) => {
          return <p>Hello from contacts:- {(item.country)}<hr /></p>;
        })
    }    
    {<p>Hello from contacts:- {ENUM_STATES["foo"]}</p>}
    </>
  );
}

export default Contacts;
