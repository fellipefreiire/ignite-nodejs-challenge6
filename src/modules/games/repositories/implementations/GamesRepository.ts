import { getRepository, Repository, ILike } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder('games')
      .where(`games.title ILIKE '%${param}%'`)
      .getMany()
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`SELECT COUNT(*) FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // return this.repository
    //   .createQueryBuilder('games')
    //   .where(`games.id = ':id'`, { id })
    //   .getMany()

    // return this.repository
    //   .createQueryBuilder()
    //   .select('*')
    //   .from('users')
    //   .leftJoin('users_games_games')

    return this.repository.query(`
      SELECT u.* FROM users u
      JOIN users_games_games ugg
      ON u.id = ugg."usersId"
      JOIN games g
      ON ugg."gamesId" = g.id
      WHERE g.id = '${id}'
    `)

    // Complete usando query builder
  }
}
