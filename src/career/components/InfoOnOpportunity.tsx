import React from 'react';
import { formatLocations } from './Job';
import style from '../less/career.less';
import Heading from 'common/components/Heading';
import Markdown from 'common/components/Markdown';
import { Link } from 'react-router-dom';
import Img from 'common/components/Img';

export interface IInfoBox {
  title: string;
  deadline: string;
  locations: string[];
  description: string;
  type: string;
  companyName: string;
  companyDescription: string;
  companyImage: any;
  companyId: number;
}

const InfoBox = (props: IInfoBox) => (
  <div>
    <Heading>Karrieremulighet - {props.companyName}</Heading>
    <div className={style.detail}>
      <div className={style.jobDescription}>
        <h1 className={style.jobTitle}>{props.title}</h1>
        <Markdown source={props.description} escapeHtml />
      </div>
      <div>
        <div className={style.company}>
          <Link className={style.companyImage} to={`/company/${props.companyId}`}>
            <Img src={props.companyImage.lg} alt={props.companyName} />
          </Link>
          <div className={style.companyDescriptionBox}>
            <Link className={style.companyDescriptionTitle} to={`/company/${props.companyId}`}>
              <h3>{props.companyName}</h3>
            </Link>
            <Markdown className={style.companyDescriptionContent} source={props.companyDescription} escapeHtml />
          </div>
          <div className={style.keyInfo}>
            <h3>Nøkkelinformasjon</h3>
            <p>Type: {props.type}</p>
            <p>Sted: {formatLocations(props.locations)}</p>
            <p>Frist: {props.deadline}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default InfoBox;
