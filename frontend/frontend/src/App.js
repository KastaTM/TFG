import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import UserLogin from './components/UserLogin';
import ListPatient from './components/lists/ListPatient';
import CreateUser from './components/create/CreateUser';
import ViewUser from './components/views/ViewUser';
import Footer from './components/common/Footer';
import ViewPatient from './components/views/ViewPatient';
import CreatePatient from './components/create/CreatePatient';
import UpdatePatient from './components/updates/UpdatePatient';
import ListSymptom from './components/lists/ListSymptom';
import ViewSymptom from './components/views/ViewSymptom';
import CreateSymptom from './components/create/CreateSymptom';
import ListDisease from './components/lists/ListDisease';
import CreateDisease from './components/create/CreateDisease';
import ViewDisease from './components/views/ViewDisease';
import UpdateDisease from './components/updates/UpdateDisease';
import AddSymptom from './components/adds/AddSymptom';
import ListMedicine from './components/lists/ListMedicine';
import CreateMedicine from './components/create/CreateMedicine';
import UpdateMedicine from './components/updates/UpdateMedicine';
import ViewMedicine from './components/views/ViewMedicine';
import AddSymptomM from './components/adds/AddSymptomM';
import ViewRecord from './components/views/ViewRecord';
import ListRecord from './components/lists/ListRecord';
import CreateRecord from './components/create/CreateRecord';
import UpdateRecord from './components/updates/UpdateRecord';
import UpdateUser from './components/updates/UpdateUser';
import AdminView from './components/AdminView';
import AddDisease from './components/adds/AddDisease';
import AddSymptomR from './components/adds/AddSymptomR';
import AddDiseaseM from './components/adds/AddDiseaseM';
import CreateAppointment from './components/create/CreateAppointment';
import ListAppointment from './components/lists/ListAppointment';
import ViewAppointment from './components/views/ViewAppointment';
import ViewNotification from './components/views/ViewNotification';
import ListNotification from './components/lists/ListNotification';
import CreateNofication from './components/create/CreateNotification';
import UpdatePassword from './components/updates/UpdatePassword';

function App() {
  return (
    <div>
      <Router forceRefresh={true}>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={UserLogin}></Route>
            <Route exact path="/admin-view/:id" component={AdminView}></Route>
            <Route exact path="/list-patients/:id" component={ListPatient}></Route>
            <Route exact path="/list-appointments/:id/:order" component={ListAppointment}></Route>
            <Route exact path="/list-notifications/:id/:order" component={ListNotification}></Route>
            <Route exact path="/list-symptoms" component={ListSymptom}></Route>
            <Route exact path="/list-diseases" component={ListDisease}></Route>
            <Route exact path="/list-medicines" component={ListMedicine}></Route>
            <Route exact path="/list-records/:id/:idPatient" component={ListRecord}></Route>
            <Route exact path="/add-user" component={CreateUser}></Route>
            <Route exact path="/add-patient" component={CreatePatient}></Route>
            <Route exact path="/add-symptom" component={CreateSymptom}></Route>
            <Route exact path="/add-disease" component={CreateDisease}></Route>
            <Route exact path="/add-medicine" component={CreateMedicine}></Route>
            <Route exact path="/add-appointment" component={CreateAppointment}></Route>
            <Route exact path="/add-notification" component={CreateNofication}></Route>
            <Route exact path="/add-record/:idPatient" component={CreateRecord}></Route>
            <Route exact path="/add-symptom-to-disease/:id" component={AddSymptom}></Route>
            <Route exact path="/add-symptom-to-medicine/:id" component={AddSymptomM}></Route>
            <Route exact path="/add-symptom-to-record/:idPatient/:idRecord" component={AddSymptomR}></Route>
            <Route exact path="/add-disease-to-patient/:id" component={AddDisease}></Route>
            <Route exact path="/add-disease-to-medicine/:id" component={AddDiseaseM}></Route>
            <Route exact path="/update-user/:id" component={UpdateUser}></Route>
            <Route exact path="/update-patient/:id" component={UpdatePatient}></Route>
            <Route exact path="/update-disease/:id" component={UpdateDisease}></Route>
            <Route exact path="/update-medicine/:id" component={UpdateMedicine}></Route>
            <Route exact path="/update-password/:id" component={UpdatePassword}></Route>
            <Route exact path="/update-record/:idPatient/:idRecord" component={UpdateRecord}></Route>
            <Route exact path="/view-user/:id" component={ViewUser}></Route>
            <Route exact path="/view-patient/:id/:idPatient" component={ViewPatient}></Route>
            <Route exact path="/view-symptom/:id" component={ViewSymptom}></Route>
            <Route exact path="/view-disease/:id" component={ViewDisease}></Route>
            <Route exact path="/view-medicine/:id" component={ViewMedicine}></Route>
            <Route exact path="/view-appointment/:id/:idAppointment" component={ViewAppointment}></Route>
            <Route exact path="/view-notification/:id/:idNotification" component={ViewNotification}></Route>
            <Route exact path="/view-record/:id/:idPatient/:idRecord" component={ViewRecord}></Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;