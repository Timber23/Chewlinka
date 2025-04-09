import React, { useState, useEffect  } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonItemDivider, IonItemGroup, IonLabel, IonSelect, IonSelectOption, IonButton, IonCheckbox, useIonToast, IonToast} from '@ionic/react';
import { IonImg  } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { heartOutline } from 'ionicons/icons';

const Tab1: React.FC = () => {

  // Python API Call
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  // Form input objects
  const [name, setName] = useState('');

  // Show toast via a function
  const [present] = useIonToast();

  // Form object
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phone: '',
    type: '',
    size: '',
    includePhone: '',
    message: '',
    orderId: '',
    status: '',
  });

  // Select list details
  const shapeOptions = {
    header: 'Tag Shape',
    subHeader: 'Select the shape of your tag',
    message: 'Choose only one',
    translucent: true,
  };

  const sizeOptions = {
    header: 'Tag Size',
    subHeader: 'Select the size of your tag',
    message: 'Choose only one',
    translucent: true,
  };

  // Submit function to store into local storage
  const onSubmit = (e: any) => {
    e.preventDefault();
    // Generate order id
    formData['orderId'] = Date.now().toString()
    formData['status'] = 'In Progress'

    // Store the values locally to we will later submit them for storage in a 
    // database - this is to support offline mode
    localStorage.setItem(formData.orderId, JSON.stringify(formData));

    presentToast();
  };

  // input object function to set the value to the form object for storage
  const handleChange = (e: any) => {
    setFormData({...formData,[e.target.name]: e.target.value,});
  };

  const presentToast = () => {
    present({
      message: 'Order Saved!',
      duration: 1500,
      position: 'top',
      icon: heartOutline,
      onDidDismiss: () => {window.location.reload()},
    });
  };

  const callPython = async () => {
    try {
      const response = await fetch('http://localhost:5000/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: inputValue }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error calling Python:", error);
      setResult('Error occurred. Check console.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle>Order Form</IonTitle>          
          <IonImg slot='end' src="/resources/Chewlinka_Logo_sm.jpg" alt="Chewlinka Icon" ></IonImg>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form name="orderForm" onSubmit={onSubmit}>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Order Form</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
            <IonItemDivider>
              <IonLabel>Customer Name</IonLabel>
            </IonItemDivider>
            <IonItem>
              <IonInput name="name" label="Name :" labelPlacement="stacked" placeholder="Your name here!" clearInput={true} onIonChange={handleChange}></IonInput>
            </IonItem>
            <IonItemDivider>
              <IonLabel>Customer Address</IonLabel>
            </IonItemDivider>
            <IonItem>
              <IonInput name="address" label="Street Address :" labelPlacement="stacked" placeholder="Your road!" clearInput={true} onIonChange={handleChange}></IonInput>
            </IonItem>
            <IonItem>
              <IonInput name="city" label="City :"  labelPlacement="stacked" placeholder='Your city!' clearInput={true} onIonChange={handleChange}></IonInput>
            </IonItem>
            <IonItem>
              <IonInput name="state" label="State :"  labelPlacement="stacked" placeholder="Your state!" clearInput={true} onIonChange={handleChange}></IonInput>
            </IonItem>
            <IonItem>
              <IonInput name="zip" label="Zip :"  labelPlacement="stacked" placeholder="Your zip!" clearInput={true} onIonChange={handleChange}></IonInput>
            </IonItem>
            <IonItemDivider>
              <IonLabel>Customer Contact</IonLabel>
            </IonItemDivider>
            <IonItem>
              <IonInput name="email" label="Email :" type="email" labelPlacement="stacked" placeholder="email@domain.com" clearInput={true} onIonChange={handleChange}></IonInput>
            </IonItem>          
            <IonItem>
              <IonInput name="phone" label="Phone Number :" type="tel" labelPlacement="stacked" placeholder="888-888-8888" clearInput={true} onIonChange={handleChange}></IonInput>
            </IonItem>
            <IonItemDivider>
              <IonLabel>Tag Selection</IonLabel>
            </IonItemDivider>
            <IonItem>
              <IonSelect name="type" label="Type" labelPlacement="stacked" interfaceOptions={shapeOptions} interface="alert" placeholder="Select One" onIonChange={handleChange}>
                <IonSelectOption value="round">Round</IonSelectOption>
                <IonSelectOption value="bone">Bone</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonSelect name="size" label="Size" labelPlacement="stacked" interfaceOptions={sizeOptions} interface="alert" placeholder="Select One" onIonChange={handleChange}>
                <IonSelectOption value="little">Litte</IonSelectOption>
                <IonSelectOption value="big">Big</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonCheckbox name="includePhone" justify="start" onIonChange={handleChange}>Include Phone # : </IonCheckbox>
            </IonItem>
            <IonItemDivider>
              <IonLabel>Custom Message</IonLabel>
            </IonItemDivider>
            <div className="ion-padding-start">
              <IonInput name="message" label="Message :" labelPlacement="stacked" counter={true} maxlength={20} clearInput={true} onIonChange={handleChange}></IonInput>
            </div>
            <IonItemDivider>
              <IonLabel>Price</IonLabel>
            </IonItemDivider>
            <IonItem>
              <IonLabel>$12.99</IonLabel>
            </IonItem>

            <IonButton id="order-submit" type="submit" expand="block" color="secondary" className='ion-padding-top'>Create Order!</IonButton>
            
          </IonList>

          <IonToast position="top" positionAnchor="header" message="Order Saved!" duration={5000} icon={heartOutline}></IonToast>

        </form>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
