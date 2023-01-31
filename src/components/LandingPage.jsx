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

    if (newData.id) {
      // one way
      // const upData = [
      //   ...datas.filter((item) => item.id !== newData.id),
      //   newData,
      // ];

      // another way

    
        const upData = datas.map(item=>{
          if(item.id===newData.id){
            return newData;
          }
          return item;
        })
      


      // console.log(upData);
      setDatas(upData);
      localStorage.setItem('stored_data', JSON.stringify(upData));
      setNewData([]);
      
    } else {
      const addData = {
        id:
          String(event.target.name.value).slice(0, 3) +
          String(time.getTime()) +
          String(Math.ceil(Math.random(7) * 100000)),
        ...newData,
      };

      setDatas([...datas, addData]);
      localStorage.setItem('stored_data', JSON.stringify([...datas, addData]));
    }

    document.getElementById('inputFormId').reset();
  };

  const handleDelete = (id) => {
    const removedData = datas.filter((item) => item?.id !== id);
    setDatas(removedData);
    localStorage.setItem('stored_data', JSON.stringify(removedData));
  };
  const handleUpdate = (item) => {
    setNewData(item);
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

  // console.log(newData);
  return (
    <div>
      <h1>Local Storage Crud Operation</h1>
      <hr />

      <form
        onSubmit={(event) => handleOnSubmit(event)}
        style={{ paddingTop: '20px' }}
        id='inputFormId'
      >
        <input
          type='text'
          name='name'
          placeholder='Name'
          defaultValue={newData?.name}
          onBlur={(e) => handleOnBlur(e)}
        />
        <input
          type='text'
          name='address'
          placeholder='Address'
          defaultValue={newData?.address}
          onBlur={(e) => handleOnBlur(e)}
        />
        <input
          type='date'
          name='dob'
          defaultValue={newData?.dob}
          onBlur={(e) => handleOnBlur(e)}
        />
        <input
          type='submit'
          value='Add / Update'
        />
      </form>
      <div style={{ textAlign: 'start' }}>
        {datas.map((item) => (
          <ul
            key={item?.id}
            style={{ listStyleType: 'none' }}
          >
            <li>{item?.name}</li>
            <button
              onClick={() => handleUpdate(item)}
              type='button'
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(item?.id)}
              type='button'
            >
              Delete
            </button>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
