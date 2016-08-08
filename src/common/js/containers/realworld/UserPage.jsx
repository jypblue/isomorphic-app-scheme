/*
 * @Author: jypblue
 * @Date:   2016-08-08 15:03:39
 * @Last Modified by:   jypblue
 * @Last Modified time: 2016-08-08 15:03:45
 */

'use strict';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadUser,loadStarred } from '../../actions/realworld';
import User from '../../components/realworld/User';
import Repo from '../../components/realworld/Repo';
import List from '../../components/realworld/List';
import _ from 'lodash';
const zip = _.zip;

function loadData(props) {

}
