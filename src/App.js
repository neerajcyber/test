
import React, { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Table, Space, Form, Button, Input } from 'antd';


export default function App() {
  const [ind, setInd] = useState();
  const [name, setName] = useState();
  const [department, setDepartment] = useState();
  const [salary, setSalary] = useState();
  const [list, setList] = useState([
    {
      Name: "Neeraj",
      Department: "Backend",
      Salary:30000
    },
    {
      Name: "amit",
      Department: "Frontend",
      Salary:30700
    }
  ]);
  const [filteredInfo, setFilteredInfo] = useState({});
  
  const columns = [
    {
      key:1,
      title: "Name",
      dataIndex: "Name"
    },
    {
      key:2,
      title: "Department",
      dataIndex: "Department",
      filters: [
        {
          text: 'Frontend',
          value: 'Frontend',
        },
        {
          text: 'Backend',
          value: 'Backend',
        },
      ],
      
      onFilter: (value, record) => record.Department.includes(value)
    },
    {
      key:3,
      title: "Salary",
      dataIndex: "Salary",
      sorter:(a,b)=>a.Salary - b.Salary, 
     
    },
    {
      key:4,
      title: "Operation",
      render: (_, record) => {
        return (

          <Space margin="32">
            <Button
              type="primary"
              onClick={() => {
                handleEdit(record);
              }}
            >
              Edit
            </Button>
            <Button
              type="danger"
              onClick={() => {
                handleDelete(record);
                setInd(record.Id);

              }}
            >
              Delete
            </Button>
          </Space>
        );
      }
    }
  ]


  const onChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    console.log(filteredInfo);
    
  };
  const handleEdit = (record) => {
    const index = list.findIndex((item) => item.Name === record.Name);
    setInd(index);
    setName(record.Name);
    setDepartment(record.Department);
    setSalary(record.Salary);
    console.log("index", ind);
  }
  const handleDelete = (record) => {
    const index = list.findIndex((item) => item.Name === record.Name);
    const a = [...list];
    a.splice(index, 1);
    setList(a);
    console.log("index",index);
    // setInd(null);

  }
  
  const save = () => {
    const obj = {
      Name: name,
      Department: department,
      Salary:salary
    }
    setList([...list, obj]);

    if (ind != null) {
      const k = [...list];
      const obj2 = {
        Name: name,
        Department: department,
        Salary:salary
      }
      k[ind] = obj2;
      setList(k);
      console.log(ind);
      setInd(null);
    }
    setName(null);
    setDepartment(null);
    setSalary(null);
    setInd(null)
  }
  return (
    <div className="App">
    
      <h1  sx={{color:'red'}}>Using Ant  Design table and Form to Employee Create delete and Update</h1>
      <Form onFinish={save}>
        <Form.Item label="Name">
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name Here"></Input>
        </Form.Item>
        <Form.Item label="Department">
          <Input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Enter Department Here"></Input>
        </Form.Item>
        <Form.Item label="Salary">
          <Input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Enter Salary Here"></Input>
        </Form.Item>
        <Form.Item>
          <Button type="submit" htmlType="submit">Submit</Button>
        </Form.Item>

      </Form>

      <Table columns={columns} dataSource={list} onCchange={onChange} />


  </div>
    
  );
}
