// 定义全局常量

export const BOUNDARY_X = 338;
export const BOUNDARY_Y = 588;

// 碰撞体分组
export enum CollisionTAG {
    Player = 0,
    Bullet = 10,
    Enemy0 = 20,
    Enemy1 = 30,
    Enemy2 = 40
}

export const playerConfig = {
    SHOOT_RATE: 2, // 射击频率
    HP: 3, // 生命值
}


