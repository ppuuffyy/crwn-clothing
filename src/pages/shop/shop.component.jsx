import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
//import {createStructuredSelector} from 'reselect'

//import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
//import { selectIsCollectionsLoaded} from '../../redux/shop/shop.selector';

//import WithSpinner from '../../components/with-spinner/with-spinner.component';

//const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
//const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({fetchCollectionsStart, match}) =>  {
    // constructor(){
    //     super();
    //     this.state = {
    //         loading: true
    //     }
    // }

    // state = {
    //     loading: true
    // };

    // unsubscribeFromSnapshot = null;

    //componentDidMount(){
        //const {updateCollections} = this.props;
        //const collectionRef = firestore.collection('collections');
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        //     const collectionMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionMap);
        //     this.setState({loading: false});
        // });
        
        // collectionRef.get().then(snapshot => {
        //     const collectionMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionMap);
        //     this.setState({loading: false});
        // });

        // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-e66f1/databases/(default)/documents/collections')
        //     .then(response => response.json()).then(collections => console.log(collections));
    //     const {fetchCollectionsStartAsync} = this.props;
    //     fetchCollectionsStartAsync();

    // };

    // componentWillUnmount() {
    //   //  this.unsubscribeFromSnapshot();
    // };
    

        //const {match} = this.props;
        //const {loading} = this.state;

        useEffect(() => {
            fetchCollectionsStart();
        }, [fetchCollectionsStart]);


        return (
            <div className='shop-page'> 
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionsOverviewContainer}
                />

                <Route
                  path={`${match.path}/:collectionId`}
                  component={CollectionPageContainer}
                />
            </div>
        );
    
    }

    // const mapStateToProps = createStructuredSelector({
    //    // isCollectionFetching: selectIsCollectionFetching,
    //     isCollectionsLoaded: selectIsCollectionsLoaded
    // });

    const mapDispatchToProps = dispatch => ({
        fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
    });

export default connect(null, mapDispatchToProps)(ShopPage);