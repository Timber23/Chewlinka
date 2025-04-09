import React, { useState, useEffect, useRef  } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonLabel, IonGrid, IonRow, IonCol, IonButton, IonSearchbar } from '@ionic/react';
import { IonCard, IonCardContent } from '@ionic/react';
import { IonImg  } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const Tab2: React.FC = () => {

  const [orderList, setOrderList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      loadData();
      isMounted.current = true;
      //localStorage.clear();
    }
    
  }, []);

  // Load data into the local object
  const loadData = () => {
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const order = JSON.parse(localStorage.getItem(key));
        // Static List
        setOrderList(orderList => [...orderList, order]);1
        // Filtered List for search
        setFilteredOrders(filteredOrders => [...filteredOrders, order]);
      }
    }
  }

  // Search data in the form using the search bar
  const searchData = (event: Event) => {

    let query = '';
    const target = event.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    //setOrderList(orderList.filter(order => order.status.toLowerCase().includes(query)));
    setFilteredOrders(orderList.filter(order => order.status.toLowerCase().includes(query)));
  }

  // Remove the value on cancel for local storage
  const removeOrder = (value) => {
    //localStorage.removeItem(value);

    // Update local storage value to Complete
    const storedObjectString = localStorage.getItem(value);
    const storedObject = JSON.parse(storedObjectString);
    storedObject['status'] = "Canceled";
    localStorage.setItem(value, JSON.stringify(storedObject));

    window.location.reload();
  }

  // Set the status of an order to complete
  const completeOrder = (value) => {
    //const order = orderList.find(element => element.orderId === value);
    // Update local storage value to Complete
    const storedObjectString = localStorage.getItem(value);
    const storedObject = JSON.parse(storedObjectString);
    storedObject['status'] = "Completed";
    localStorage.setItem(value, JSON.stringify(storedObject));

    window.location.reload();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle>Customer Orders</IonTitle>          
          <IonImg slot='end' src="/resources/Chewlinka_Logo_sm.jpg" alt="Chewlinka Icon" ></IonImg>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Customer Orders</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar animated={true} placeholder="Search By Status" onIonInput={(event) => searchData(event)}></IonSearchbar>
        {filteredOrders.map((item,index) => (
          <IonCard key={index}>
              <IonCardContent>
              <IonLabel>Order Details - {item.status}</IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol><IonInput label="Name" labelPlacement="stacked" value={item.name} disabled={true}></IonInput></IonCol>
                  <IonCol><IonInput label="Order #" labelPlacement="stacked" value={item.orderId} disabled={true}></IonInput></IonCol>
                  <IonCol><IonInput label="Email" labelPlacement="stacked" value={item.email} disabled={true}></IonInput></IonCol>
                </IonRow>
                <IonRow>
                  <IonCol><IonInput label="Type" labelPlacement="stacked" value={item.type} disabled={true}></IonInput></IonCol>
                  <IonCol><IonInput label="Size" labelPlacement="stacked" value={item.size} disabled={true}></IonInput></IonCol>
                  <IonCol><IonInput label="Include Phone #" labelPlacement="stacked" value={item.includePhone} disabled={true}></IonInput></IonCol>
                </IonRow>
                <IonRow>
                  <IonCol><IonInput label="Message" labelPlacement="stacked" value={item.message} disabled={true}></IonInput></IonCol>
                </IonRow>
              </IonGrid>
              <IonLabel>Shipping Details</IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol><IonInput label="Address" labelPlacement="stacked" value={item.address} disabled={true}></IonInput></IonCol>
                  <IonCol><IonInput label="City" labelPlacement="stacked" value={item.city} disabled={true}></IonInput></IonCol>
                  <IonCol></IonCol>
                </IonRow>
                <IonRow>
                  <IonCol><IonInput label="State" labelPlacement="stacked" value={item.state} disabled={true}></IonInput></IonCol>
                  <IonCol><IonInput label="Zip" labelPlacement="stacked" value={item.zip} disabled={true}></IonInput></IonCol>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
              <IonLabel>Actions</IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol><IonButton type="submit" color="success" onClick={() => completeOrder(item.orderId)}>Complete</IonButton></IonCol>
                  <IonCol><IonButton type="submit" color="danger" onClick={() => removeOrder(item.orderId)}>Cancel</IonButton></IonCol>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
              </IonCardContent>
            </IonCard>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
