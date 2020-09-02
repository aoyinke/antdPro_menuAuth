
import React, { useState, useEffect } from 'react';
import { ChartCard } from './Charts';
import classNames from 'classnames';
import Debounce from 'lodash.debounce';
import styles from '../style.less';


let root = undefined;
let requestRef = undefined

const IntroduceRowItemTitle = ({ title }) => {

  if (title === "水淹报警" || title === "烟雾报警") {
    return (
      <div className={styles.AlertInfo}>
        <div >{title}</div>
      </div>
    )
  } else {
    return (
      <div className={styles.AlertTitle}>
        <div >{title}</div>
      </div>
    )
  }

}

const handleRoot = n => {
  root = n;
};


const IntroduceRow = ({ loading }) => {
  const [ismiddle, handleIsmiddle] = useState(false)
  const [ismini, handleIsmini] = useState(false)
  const resize = Debounce(() => {
    console.log("加载了resize")
    if (!root) {
      window.removeEventListener('resize', resize);
      return;
    }
    console.log(root.parentNode.clientWidth)
    if ( root && root.parentNode && (root.parentNode.clientWidth <= 465 && root.parentNode.clientWidth >= 385)) {
      if (!ismiddle) {
        console.log("46455555555")
        handleIsmiddle(() => true)
        handleIsmini(() => false)
      }
    } else if (root && root.parentNode && root.parentNode.clientWidth <= 384) {
      console.log("38444444444444")
      handleIsmiddle(() => false)
      handleIsmini(() => true)
    } else if(root && root.parentNode && root.parentNode.clientWidth >=466){
      console.log("488888888888888")

      handleIsmiddle(() => false)
      handleIsmini(() => false)

    }
  }, 400);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        requestRef = requestAnimationFrame(() => resize());
      },
      {
        passive: true,
      },
    );
    resize()
    return () => {
      if (requestRef) {
        window.cancelAnimationFrame(requestRef);
      }

      window.removeEventListener('resize', resize);

      if (resize) {
        resize.cancel();
      }
    }
  }, [])

  const IntroduceRowItemClassName = classNames(styles.IntroduceRowItem, {
    [styles.middleSized]: ismiddle,
    [styles.lgSized]: !ismiddle,
    [styles.miniSized]: ismini
  })
  return (
    <div className={styles.IntroduceRow} ref={handleRoot} >
      <ChartCard
        bordered={false}
        title={<IntroduceRowItemTitle title="企业总数 " />}
        className={IntroduceRowItemClassName}
        bordered={false}
        loading={loading}
        total={() => <p>2181 家</p>}
        contentHeight={30}
      >

      </ChartCard>

      <ChartCard
        bordered={false}
        loading={loading}
        className={IntroduceRowItemClassName}
        title={<IntroduceRowItemTitle title="灾害监测点" />}

        total={() => <p>2350/3424个</p>}
        contentHeight={30}
      >
      </ChartCard>





      <ChartCard
        bordered={false}
        loading={loading}
        title={<IntroduceRowItemTitle title="水淹报警" />}
        className={IntroduceRowItemClassName}

        total={() => <div style={{ color: "red", fontWeight: "bold" }}>14 个</div>}

        contentHeight={30}
      >
      </ChartCard>



      <ChartCard
        loading={loading}
        bordered={false}
        className={IntroduceRowItemClassName}
        title={<IntroduceRowItemTitle title="烟雾报警" />}

        total={() => <div style={{ color: "red", fontWeight: "bold" }}>2 个</div>}

        contentHeight={30}
      >
      </ChartCard>


    </div>
  )
};

export default IntroduceRow;
