import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import {updateCollections} from '../../redux/shop/shop.actions';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.util';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component  {
    // constructor(){
    //     super();
    //     this.state = {
    //         loading: true
    //     }
    // }

    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        //     const collectionMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionMap);
        //     this.setState({loading: false});
        // });
        
        collectionRef.get().then(snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionMap);
            this.setState({loading: false});
        });

        // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-e66f1/databases/(default)/documents/collections')
        //     .then(response => response.json()).then(collections => console.log(collections));


    };

    componentWillUnmount() {
      //  this.unsubscribeFromSnapshot();
    };
    
    render(){
        const {match} = this.props;
        const {loading} = this.state;

        return (
            <div className='shop-page'> 
                <Route
                    exact
                    path={`${match.path}`}
                    render={props => (
                      <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
                    )}
                />

                <Route
                  path={`${match.path}/:collectionId`}
                  render={props => (
                    <CollectionPageWithSpinner isLoading={loading} {...props} />
                  )}
                />
            </div>
        );
    }
    }

    const mapDispatchToProps = dispatch => ({
        updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
    })

export default connect(null,mapDispatchToProps)(ShopPage);