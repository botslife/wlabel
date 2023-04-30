import React, { Component } from "react";
import CountryService from "../services/country.service";
import DataTable from "react-data-table-component";
import AuthService from "../services/auth.service";
import { Navigate} from "react-router-dom";
import App from "../App";
const columns = [
  {
    name: "Name",
    selector: row => row.name,
    sortable: true,
  },
  {
    name: "ISO3",
    selector: row => row.iso3,
    sortable: true,
  },
  {
    name: "Latitude",
    selector: row => row.lat,
    sortable: true,
  },
  {
    name: "Longitude",
    selector: row => row.lng,
    sortable: true,
  },
];

const sampleData = [
  { id: 1, name: "India", iso3: "IND", lat: "20.20", lng: "10.10" },
  { id: 2, name: "String", iso3: "STR", lat: "22.22", lng: "33.33" },
];

export default class BoardCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      selectedItem: null,
      modalOpen: false,
      name: "",
      iso3: "",
      lat: 0.00,
      lng: 0.00,
    };
  }

  componentDidMount() {
    const isExpired =  AuthService.isExpired();
    if(!isExpired){
      CountryService.getAllCountries()
      .then((response) => {
        this.setState({ content: response.data });
      })
      .catch((error) => {
      });
      
    }
    
  }

  handleRowClicked = (row) => {
    this.setState({
      selectedItem: row,
      modalOpen: true,
      name: row.name,
      iso3: row.iso3,
      lat: row.lat,
      lng: row.lng,
    });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleIso3Change = (event) => {
    this.setState({ iso3: event.target.value });
  };

  handleLatChange = (event) => {
    this.setState({ lat: event.target.value });
  };

  handleLngChange = (event) => {
    this.setState({ lng: event.target.value });
  };

  handleAdd = () => {
    const { name, iso3, lat, lng } = this.state;
    const newData = [
      ...sampleData,
      { name: name, iso3: iso3, lat: lat, lng: lng },
    ];
    this.setState({
      sampleData: newData,
      modalOpen: false,
      name: "",
      iso3: "",
      lat: 0.00,
      lng: 0.00,
    });
  };

  handleUpdate = () => {
    const { selectedItem, name, iso3, lat, lng } = this.state;
    const newData = sampleData.map((item) =>
      item.id === selectedItem.id
        ? { ...item, name: name, iso3: iso3, lat: lat, lng: lng }
        : item
    );

    this.setState({
      sampleData: newData,
      modalOpen: false,
      selectedItem: null,
      name: "",
      iso3: "",
      lat: 0.00,
      lng: 0.00,
    });
  };

  handleDelete = () => {
    const { selectedItem, sampleData } = this.state;
    const newData = sampleData.filter((item) => item.id !== selectedItem.id);
    this.setState({
      sampleData: newData,
      modalOpen: false,
      selectedItem: null,
      name: "",
      iso3: "",
      lat: 0.00,
      lng: 0.00,
    });
  };

  render() {
    const { content, selectedItem, modalOpen, name, iso3, lat, lng } =
      this.state;
    const isExpired = AuthService.isExpired();
    if (!isExpired) {
      return (
        <div>
          <DataTable columns={columns} data={this.state.content} onRowClicked={this.handleRowClicked} />
          {modalOpen && (
            <div>
              <br/>
              <h4>{selectedItem ? 'Update ' : 'Add'}</h4>
              <label>
                Name: <input type="text" value={name} onChange={this.handleNameChange}/>
              </label>
              <br/>
              <label>
                ISO3: <input type="text" value={iso3} onChange={this.handleIso3Change}/>
              </label>
              <br/>
              <label>
                Lat: <input type="text" value={lat} onChange={this.handleLatChange} />
              </label>
              <label>
                Lng: <input type="text" value={lng} onChange={this.handleLngChange} />
              </label>
              <br />
              <button onClick={selectedItem ? this.handleUpdate : this.handleAdd}>
                {selectedItem ? "Update" : "Add"}
              </button>
            </div>
          )}
        </div>
      );
    }else{
      //App.logout();
      return (
        <Navigate to={"/login"} />
      );
    }
    
  }
}
