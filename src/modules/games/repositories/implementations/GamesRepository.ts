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
    const users = getRepository(User)
      .createQueryBuilder('users')
      .leftJoin('users.games', 'games')
      .where(`games.id = '${id}'`)
      .getMany()

    return users

    // Complete usando query builder
  }
}
