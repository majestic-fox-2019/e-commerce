const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')

afterAll(() => {
  console.log('db closed')
  return sequelize.close()
})

let banner = {
  name: 'macbook air',
  image: 'https://static.bmdstatic.com/pk/product/medium/5a5425323ba7a.jpg'
}

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6IkFkbWluMSIsImVtYWlsIjoiYWRtaW4xQG1haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZX0.9YWcy3G_mWUjoXWnLiXHboPBkTyA_eNMyfBEmR29B_4'

const nonAdminToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ0ZXN0ZXIxMjMiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZX0.pIn0WXDNprufg6K8VEhOUjRVMfjycHp0oTSwV21HwGs`

describe('Create banner', () => {
  it('On Success should return', (done) => {
    request(app)
      .post('/banners/')
      .set('token', token)
      .send(banner)
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('name')
          expect(res.body).toHaveProperty('image')
          expect(res.body).toHaveProperty('createdAt')
          expect(res.body).toHaveProperty('updatedAt')
          expect(res.body.name).toMatch(banner.name)
          expect(res.body.image).toMatch(banner.image)
          done()
        }
      })
  })

  it('On fail should return', (done) => {
    request(app)
      .post('/banners/')
      .set('token', token)
      .send({
        name: '',
        image: ''
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('msg')
          expect(res.body.msg).toContain('Banner name is required')
          expect(res.body.msg).toContain('Banner image is required')
          done()
        }
      })
  })
})

describe('Get all banner', () => {
  it('On Success should return', (done) => {
    request(app)
      .get('/banners/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(Array.isArray(res.body)).toBeTruthy()
          expect(res.body[0]).toHaveProperty('image')
          expect(res.body[0]).toHaveProperty('name')
          expect(res.body[0]).toHaveProperty('createdAt')
          expect(res.body[0]).toHaveProperty('updatedAt')
          expect(res.body[0]).not.toBeUndefined()
          done()
        }
      })
  })
})

describe('Get one banner detail', () => {
  it('On Success should return', (done) => {
    request(app)
      .get('/banners/1')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('image')
          expect(res.body).toHaveProperty('name')
          expect(res.body).toHaveProperty('createdAt')
          expect(res.body).toHaveProperty('updatedAt')
          done()
        }
      })
  })

  it('On fail should return', (done) => {
    request(app)
      .get('/banners/100')
      .expect(404)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('msg')
          expect(res.body.msg).toContain('Banner not found')
          done()
        }
      })
  })
})

describe('Delete a banner', () => {
  it('On Success should return', (done) => {
    request(app)
      .delete('/banners/1')
      .set('token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('image')
          expect(res.body).toHaveProperty('name')
          expect(res.body).toHaveProperty('createdAt')
          expect(res.body).toHaveProperty('updatedAt')
          done()
        }
      })
  })

  it('On fail should return', (done) => {
    request(app)
      .delete('/banners/1')
      .set('token', nonAdminToken)
      .expect(403)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('msg')
          expect(res.body.msg).toMatch('Forbidden Access')
          done()
        }
      })
  })
})
