import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    JoinTable,
    ManyToMany,
    OneToMany
} from 'typeorm';
import { IsEmail, Validate } from 'class-validator';
import * as crypto from 'crypto';
import { ArticleEntity } from '../article/article.entity';

/**
 * User entity
 */
@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Username
     */
    @Column()
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column({ default: '' })
    bio: string;

    @Column({ default: '' })
    image: string;

    /**
     * Password
     */
    @Column()
    password: string;

    @BeforeInsert()
    hashPassword() {
        this.password = crypto
            .createHmac('sha256', this.password)
            .digest('hex');
    }

    @ManyToMany(type => ArticleEntity)
    @JoinTable()
    favorites: ArticleEntity[];

    /**
     * Link with his articles
     */
    @OneToMany(type => ArticleEntity, article => article.author)
    articles: ArticleEntity[];
}
