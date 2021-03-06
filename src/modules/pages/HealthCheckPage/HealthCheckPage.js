import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SearchingContainer from '../../../components/SearchBar/searchContainer'
import HealthCheckContainer from './healthCheckContainer'

import Section from '../../Layout/Section/Section'
import Row from '../../Layout/Row/Row'
import Title from '../../Layout/Title/Title'

const propTypes = {
  location: PropTypes.object.isRequired,
  status: PropTypes.bool
}

const HealthCheckPage = ({ location, status }) => {
  const renderTop = () => {
    if (!status && status !== null) {
      return (
        <Row>
          <Title>Health Check Problems</Title>
          <SearchingContainer />
        </Row>
      )
    }

    return (
      <Row>
        <Title>Health Check</Title>
      </Row>
    )
  }

  return (
    <Section outer>
      <Section>
        { renderTop() }
      </Section>
      <Section>
        <HealthCheckContainer />
      </Section>
    </Section>
  )
}

HealthCheckPage.propTypes = propTypes

const mapStateToProps = state => ({
  status: state.healthcheckReducer.status
})

export default connect(
  mapStateToProps,
  null
)(HealthCheckPage)
