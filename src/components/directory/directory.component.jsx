import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './directory.styles.scss';

import MenuItem from "../../components/menu-item/menu-item.component";
import {selectDirectorySections} from '../../redux/directory/directory.selector';

const  Directory = ({sections}) =>  (
        <div className='directory-menu'>
            {
                // this.state.sections.map(({title, imageUrl, id, size, linkUrl}) => (
                //     <MenuItem key={id} title={title.toUpperCase()} imageUrl={imageUrl} size={size} linkUrl={linkUrl}/>
                // )
                // )

              sections.map(({id, ...otherSectionProps}) => (
                  <MenuItem key={id} {...otherSectionProps}/>
              )
              )
            }


        </div>
)    
      

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
  })


export default connect(mapStateToProps)(Directory);