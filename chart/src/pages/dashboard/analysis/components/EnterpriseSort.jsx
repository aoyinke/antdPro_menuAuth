import React from 'react';
import { StackedChart } from './Charts'
import { Card } from 'antd';
import styles from '../style.less';


const EnterpriseSort = props => {

    const { loading } = props
    return (
        // <Card
        //     loading={loading}
        //     bordered={false}
        //     className={styles.companyCard}
        //     style={{
        //         height: '100%',
        //     }}
        // >
        //     <div>
        //     </div>


        // </Card>
        <StackedChart loading={loading} />



    )
}

export default EnterpriseSort