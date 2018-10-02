import React, { Component } from 'react';
import { IGroup } from "core/models/Group";
import { ISearchFilter } from '../../models/Search';
import Dropdown from './Dropdown';
import DoubleSlider from './DoubleSlider';
import { getGroups } from '../../api/groups';


export interface IProps extends ISearchFilter {
  setName: (s: string) => boolean;
  setGroup: (g: IGroup) => boolean;
  setYear: (y: [number, number]) => boolean;
}

export interface IState {
  groups: IGroup[];
}

class Searchbar extends Component<IProps, IState> {
  state: IState = {
    groups: []
  }

  async componentDidMount() {
    const groups = await getGroups();
    this.setState({ groups });
  }

  public render() {
    const { name, group, year, setName, setGroup, setYear } = this.props;
    const { groups } = this.state;
    return (
      <form className="profile-search-grid">
        <input className="profile-search-field" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <Dropdown selected={group} onClick={(group) => setGroup(group)} groups={groups} />
        <DoubleSlider range={year || [1, 6]} onChange={(range) => setYear(range)}/>
      </form>
    )
  }
}

export default Searchbar;