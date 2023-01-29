import React, { useEffect, useState } from 'react';

const LandingPage = () => {
  const [datas, setDatas] = useState([]);
  const [newData, setNewData] = useState([]);

  const time = new Date();

  const handleOnBlur = (event) => {
    const { name, value } = event.target;
    const data = { ...newData };
    data[name] = value;

    setNewData(data);

  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const addData = {
      id:
        String(event.target.name.value).slice(0, 3) +
        String(time.getTime()) +
        String(Math.ceil(Math.random(7) * 100000)),
      ...newData,
    };

    setDatas([...datas, addData]);
    localStorage.setItem('stored_data', JSON.stringify([...datas, addData]));

    document.getElementById('inputFormId').reset();
  };

  useEffect(() => {
    const storedData = localStorage.getItem('stored_data');
    if (storedData) {
      setDatas(JSON.parse(storedData));
    }
  }, []);

  // useEffect(() => {
  //     localStorage.setItem('stored_data', JSON.stringify(datas));
  // }, [datas]);

  console.log(datas);
  return (
    <div>
      <h1>Local Storage Crud Operation</h1>
      <hr />

      <form
        onSubmit={(event) => handleOnSubmit(event)}
        id='inputFormId'
      >
        <input
          type='text'
          name='name'
          placeholder='Name'
          onBlur={(e) => handleOnBlur(e)}
        />
        <input
          type='text'
          name='address'
          placeholder='Address'
          onBlur={(e) => handleOnBlur(e)}
        />
        <input
          type='date'
          name='dob'
          onBlur={(e) => handleOnBlur(e)}
        />
        <input
          type='submit'
          value='Add New'
        />
      </form>
      <div style={{textAlign:'start'}}>
        {datas.map((item) => (
          <ul key={item?.id} style={{listStyleType:'none'}}>
            <li>{item?.name}</li>
            <button type='button'>Update</button>
            <button type='button'>Delete</button>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
