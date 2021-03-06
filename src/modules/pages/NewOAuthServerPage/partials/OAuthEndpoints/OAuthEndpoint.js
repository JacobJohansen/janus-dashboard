import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import { Field } from 'redux-form'
import Select from 'react-select'

import PLACEHOLDER from '../../../../../configurations/placeholders.config'
import WARNINGS from '../../../../../configurations/warning-messages.config'
import block from '../../../../../helpers/bem-cn'
import checkOnPattern from '../../../../../helpers/pattern-check'
import optionsTransformer from '../../../../../helpers/optionsTransformer'
import getValues from '../../../../../helpers/getValues'
import setUpstreams from '../../../../../helpers/setUpstreams'

import Row from '../../../../Layout/Row/Row'
import Label from '../../../../../components/Label/Label'
import Radio from '../../../../../components/Radio/Radio'
import Input from '../../../../inputs/Input'
import Hint from '../../../../../components/Hint/Hint'
import MultiSelect from '../../../../selects/MultiSelect/MultiSelect'
import TagSelect from '../../../../selects/TagSelect/TagSelect'
import WeightTargets from '../../../../pages/NewApiPage/partials/WeightTargets/WeightTargets'
import MultiRowField from '../../../../../components/MultiRowField/MultiRowField'

const b = block('j-api-form')
const row = block('j-row')
const col = block('j-col')

const propTypes = {
  category: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  initialValues: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  schema: PropTypes.object.isRequired
}

class OAuthEndpoint extends PureComponent {
    state = {
      upstreams: setUpstreams(this.props.initialValues[this.props.category][this.props.name])
    };

    createStrategyOptions = list => {
      const extractNames = list => list.map(item => item.balancing)
      const labelCombiner = item => ({
        label: item[1],
        value: item[1],
        options: item[0]
      })
      const combineListOfUnitsAndLabels = list => list.map(labelCombiner)

      return R.compose(
        combineListOfUnitsAndLabels,
        R.zip(list),
        extractNames
      )(list)
    };

    handleChangeStrategy = value => {
      this.setState(() => ({
        upstreams: {
          balancing: value.value,
          targets: value.options
        }
      }), () => {
        this.props.change(`${this.props.category}.${this.props.name}.upstreams.balancing`, value.value)
      })
    };

    renderStrategy = balancing => {
      switch (balancing) {
        case 'roundrobin': {
          return (
            <MultiRowField
              name={`${this.props.category}.${this.props.name}.upstreams.targets`}
              placeholder='Target'
              isValidate='url'
              suffix='target'
              title='Targets'
              warningMessage={WARNINGS.URL}
            />
          )
        }
        case 'weight': {
          return (
            <WeightTargets
              name={`${this.props.category}.${this.props.name}.upstreams.targets`}
              title='Targets'
              isValidate='url'
              warningMessage={WARNINGS.URL}
            />
          )
        }
        default:
          return null
      }
    };

    render () {
      const { category, editing, initialValues, name, schema } = this.props

      return (
        <div className={b('section')()}>
          <div className={b('section-title')()}>{name}</div>
          <div className={row({fullwidth: true}).mix('j-api-form__row')()}>
            <div className={row('item')()}>
              <div className={col()}>
                <div className={col('item')()}>
                  <Label>Listen Path</Label>
                </div>
                <Field
                  name={`${category}.${name}.listen_path`}
                  type='text'
                  placeholder={PLACEHOLDER.LISTEN_PATH}
                  component={Input}
                  validate={checkOnPattern('/')}
                />
                <span className='j-input__warning'>{WARNINGS.LISTEN_PATH}</span>
                <Hint>The public url that is exposed by the Gateway.</Hint>
              </div>
            </div>
            <div className={row('item')()}>
              <div className={col()}>
                <div className={col('item')()}>
                  <Label>Load balancing alg.</Label>
                </div>
                <Select
                  className='j-select'
                  name={`${category}.${name}.upstreams.balancing`}
                  options={this.createStrategyOptions(schema.oauth_endpoints[name].upstreams.options)}
                  onChange={this.handleChangeStrategy}
                  value={this.state.upstreams.balancing}
                  clearable={false}
                />
                <div className={row({fullwidth: true}).mix('j-api-form__row')()}>
                  <Row className={b('row')()} fullwidth>
                    { this.renderStrategy(this.state.upstreams.balancing) }
                  </Row>
                </div>
              </div>
            </div>
          </div>
          <div className={row({fullwidth: true}).mix('j-api-form__row')()}>
            <div className={row('item')()}>
              <Label>Insecure skip verify?</Label>
              <Row className={b('radio-wrap')()}>
                <Row className={b('radio')()}>
                  <Field
                    name={`${category}.${name}.insecure_skip_verify`}
                    component={Radio}
                    value={'true'}
                    type='radio'
                    id='is-active'
                  />
                  <Label htmlFor='is-active'>Yes</Label>
                </Row>
                <Row className={b('radio')()}>
                  <Field
                    name={`${category}.${name}.insecure_skip_verify`}
                    component={Radio}
                    value={'false'}
                    type='radio'
                    id='is-not-active'
                  />
                  <Label htmlFor='is-not-active'>No</Label>
                </Row>
              </Row>
            </div>
            <div className={row('item')()}>
              <Label>Preserve host?</Label>
              <Row className={b('radio-wrap')()}>
                <Row className={b('radio')()}>
                  <Field
                    name={`${category}.${name}.preserve_host`}
                    component={Radio}
                    value={'true'}
                    type='radio'
                    id='is-active'
                  />
                  <Label htmlFor='is-active'>Yes</Label>
                </Row>
                <Row className={b('radio')()}>
                  <Field
                    name={`${category}.${name}.preserve_host`}
                    component={Radio}
                    value={'false'}
                    type='radio'
                    id='is-not-active'
                  />
                  <Label htmlFor='is-not-active'>No</Label>
                </Row>
              </Row>
            </div>
          </div>
          <div className={row({fullwidth: true}).mix('j-api-form__row')()}>
            <div className={row('item')()}>
              <Label>Append path?</Label>
              <Row className={b('radio-wrap')()}>
                <Row className={b('radio')()}>
                  <Field
                    name={`${category}.${name}.append_path`}
                    component={Radio}
                    value={'true'}
                    type='radio'
                    id='is-active'
                  />
                  <Label htmlFor='is-active'>Yes</Label>
                </Row>
                <Row className={b('radio')()}>
                  <Field
                    name={`${category}.${name}.append_path`}
                    component={Radio}
                    value={'false'}
                    type='radio'
                    id='is-not-active'
                  />
                  <Label htmlFor='is-not-active'>No</Label>
                </Row>
              </Row>
            </div>
            <div className={row('item')()}>
              <Label>Strip path?</Label>
              <Row className={b('radio-wrap')()}>
                <Row className={b('radio')()}>
                  <Field
                    name={`${category}.${name}.strip_path`}
                    component={Radio}
                    value={'true'}
                    type='radio'
                    id='is-active'
                  />
                  <Label htmlFor='is-active'>Yes</Label>
                </Row>
                <Row className={b('radio')()}>
                  <Field
                    name={`${category}.${name}.strip_path`}
                    component={Radio}
                    value={'false'}
                    type='radio'
                    id='is-not-active'
                  />
                  <Label htmlFor='is-not-active'>No</Label>
                </Row>
              </Row>
            </div>
          </div>
          <div className={row({fullwidth: true}).mix('j-api-form__row')()}>
            <div className={row('item')()}>
              <Label>Enable load balancing?</Label>
              <Row className={b('radio-wrap')()}>
                <Row className={b('radio')()}>
                  <Field
                    name={`${category}.${name}.enable_load_balancing`}
                    component={Radio}
                    value={'true'}
                    type='radio'
                    id='is-active'
                  />
                  <Label htmlFor='is-active'>Yes</Label>
                </Row>
                <Row className={b('radio')()}>
                  <Field
                    name={`${category}.${name}.enable_load_balancing`}
                    component={Radio}
                    value={'false'}
                    type='radio'
                    id='is-not-active'
                  />
                  <Label htmlFor='is-not-active'>No</Label>
                </Row>
              </Row>
            </div>
            <div className={row('item')()}>
              <div className={col()}>
                <Label>Methods</Label>
                <Field
                  name={`${category}.${name}.methods`}
                  type='text'
                  edit={editing}
                  value={() => getValues([category, name, 'methods'])(initialValues)}
                  options={optionsTransformer(schema.oauth_endpoints[name].all_methods)}
                  component={MultiSelect}
                />
                <Hint>HTTP methods that are supported for the endpoint.</Hint>
              </div>
            </div>
          </div>
          <div className={row({fullwidth: true}).mix('j-api-form__row')()}>
            <div className={row('item')()}>
              <div className={col()}>
                <Label>Hosts</Label>
                <Field
                  name={`${category}.${name}.hosts`}
                  type='text'
                  edit={editing}
                  value={() => getValues([category, name, 'hosts'])(initialValues)}
                  options={optionsTransformer(schema.oauth_endpoints[name].hosts)}
                  component={TagSelect}
                />
                <Hint>HTTP methods that are supported for the endpoint.</Hint>
              </div>
            </div>
          </div>
        </div>
      )
    }
};

OAuthEndpoint.propTypes = propTypes

export default OAuthEndpoint
