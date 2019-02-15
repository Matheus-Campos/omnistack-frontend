import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '~/store/ducks/auth';
import TeamsActions from '~/store/ducks/teams';

import Button from '~/styles/components/Button';
import Modal from '~/components/Modal';

import {
  Container, TeamList, Team, NewTeam, Logout,
} from './styles';

class TeamSwitcher extends Component {
  static propTypes = {
    getTeamsRequest: PropTypes.func.isRequired,
    selectTeam: PropTypes.func.isRequired,
    openTeamModal: PropTypes.func.isRequired,
    closeTeamModal: PropTypes.func.isRequired,
    createTeamRequest: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    teams: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
      }),
    ).isRequired,
    teamModalOpen: PropTypes.bool.isRequired,
  };

  state = { newTeam: '' };

  componentDidMount() {
    const { getTeamsRequest } = this.props;

    getTeamsRequest();
  }

  handleTeamSelect = (team) => {
    const { selectTeam } = this.props;

    selectTeam(team);
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleCreateTeam = (e) => {
    e.preventDefault();

    const { createTeamRequest } = this.props;
    const { newTeam } = this.state;

    createTeamRequest(newTeam);
  };

  render() {
    const {
      teams, openTeamModal, teamModalOpen, closeTeamModal, signOut,
    } = this.props;

    const { newTeam } = this.state;

    return (
      <Container>
        <TeamList>
          {teams.map(team => (
            <Team key={team.id} onClick={() => this.handleTeamSelect(team)}>
              <img
                alt={team.name}
                src={`https://ui-avatars.com/api/?font-size=0.33&background=7159c1&color=fff&name=${
                  team.name
                }`}
              />
            </Team>
          ))}

          <NewTeam onClick={openTeamModal}>NOVO</NewTeam>

          {teamModalOpen && (
            <Modal>
              <h1>Criar time</h1>

              <form onSubmit={this.handleCreateTeam}>
                <span>NOME</span>
                <input name="newTeam" value={newTeam} onChange={this.handleInputChange} />

                <Button size="big" type="submit">
                  Salvar
                </Button>
                <Button onClick={closeTeamModal} size="small" color="gray">
                  Cancelar
                </Button>
              </form>
            </Modal>
          )}
        </TeamList>

        <Logout onClick={signOut}>SAIR</Logout>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams.data,
  teamModalOpen: state.teams.teamModalOpen,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...TeamsActions, ...AuthActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamSwitcher);
