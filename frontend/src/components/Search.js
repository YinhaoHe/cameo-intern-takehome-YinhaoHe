import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import '../style.css';

export default function Search () {
    const [searchTerm, setSearchTerm] = useState("");
    const [dataFromApi, setDataFromApi] = useState([]);
    const [sortConfig, setSortConfig] = useState([]);
    const [filterConfig, setFilterConfig] = useState([]);
    const [resetConfig, setResetConfig] = useState(false);
    const handleChange = e => {
      setSearchTerm(e.target.value);
    };

    useEffect(() => {
      async function fetchDataFromApi() {
        const {data: apiResponse} = await axios.get(config.API_URL+'/api/search', {
          params: {
            category: searchTerm,
            username: searchTerm,
            name: searchTerm
          }
        });
        setDataFromApi(apiResponse);
      }
      fetchDataFromApi();
    }, [searchTerm]);

    const requestSort = key => {
      let direction = "ascending";
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };

    function checkDM (talent) {
      if (filterConfig === null) {
        return true;
      }
      return talent.isAvailableForDirectMessage === true;
    }

    function checkBR (talent) {
      if (filterConfig === null) {
        return true;
      }
      return talent.isAvailableForBusinessRequests === true;
    }

    let sortedList = [...dataFromApi];

    const renderTable = () => {

      useMemo(() => {

        sortedList.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });

        return sortedList;
      }, [sortedList, sortConfig]);

      let resultList;
      console.log(filterConfig)
      if (filterConfig === null) {
        resultList = sortedList;
      } else if (filterConfig === 'isAvailableForBusinessRequests' && resetConfig === false){
        resultList = sortedList.filter(checkBR);
      } else if (filterConfig === 'isAvailableForDirectMessage' && resetConfig === false) {
        resultList = sortedList.filter(checkDM);
      } else {
        resultList = sortedList;
      }

      if (resultList) {
          return resultList.map(talent => {
            let DM, BR;
            if (talent.isAvailableForDirectMessage) {
              DM = 'Yes';
            } else {
              DM = 'NO';
            }
            if (talent.isAvailableForBusinessRequests) {
              BR = 'Yes';
            } else {
              BR = 'NO';
            }
            return (
              <tr key={talent._id}>
                <td>{talent.name}</td>
                <td>{talent.score}</td>
                <td>{talent.price}</td>
                <td>{talent.lastActiveAt}</td>
                <td>{DM}</td>
                <td>{BR}</td>
              </tr>
            )
          });
      }
    }

    return (
      <div id="app">
        <h1 id="title">Talents Search Bar Demo</h1>
        <p>
          Click the Name, Score, Price and Last Active At buttons to sort in Ascending order. Click them again to sort them in Descending order.
        <br/>
          Click the isAvailableForDirectMessage and isAvailableForBusinessRequests buttons to filter the results.
        <br/>
          After filtering, click the Reset button to reset the table. You can still sort the result after filtering your search results.
        </p>
        <p>
          Example: To search category, enter youtube; To search name, enter Debby Colson(Not Case sensitive), so you can also enter debby colson
          <br/>
          The result will be automatically genrated when you enter what you want to search. Have fun!
        </p>
        <input
          type="text"
          placeholder="Enter your search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <br/>
        <button type="button" onClick={() => setResetConfig(true)}>
          Reset
        </button>
        <table id="talents">
        <caption>Click the buttons to sort and filter</caption>
          <thead>
            <tr>
              <th>
              <button type="button" onClick={() => requestSort("name")}>
                  Name
                </button>
              </th>
              <th>
                <button type="button" onClick={() => requestSort("score")}>
                  Score
                </button>
              </th>
              <th>
                <button type="button" onClick={() => requestSort("price")}>
                  Price
                </button>
              </th>
              <th>
                <button type="button" onClick={() => requestSort("lastActiveAt")}>
                  Last Active At
                </button>
              </th>
              <th>
                <button type="button" onClick={() => {
                  setFilterConfig("isAvailableForDirectMessage");
                  setResetConfig(false);
                }}>
                  isAvailableForDirectMessage
                </button>
              </th>
              <th>
                <button type="button" onClick={() => {
                  setFilterConfig("isAvailableForBusinessRequests");
                  setResetConfig(false);
                }}>
                  isAvailableForBusinessRequests
                </button>
              </th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    );
  }
