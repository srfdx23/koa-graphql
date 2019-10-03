import graphqlHTTP from 'koa-graphql';
import { RootQuery } from '../graphql/schema';
import schema from './schema';

test('testing query', async () => {
  const middleware = graphqlHTTP({
    //some schema containing the fields we're about to query
    schema,
    rootValue: {
      id: 'person',
      loaders: {
        person: RootQuery,
      },
    },
  })


  const request = {
    method: 'POST',
    headers: {},

    body: { query: '{ person(id: "5d93754bfb93693f3845704a") {name, work, nationality}}' },
  }

   const response = {
    setHeader: jest.fn(),
    end: jest.fn(),
    json: jest.fn(),
  }


  await middleware(request, response)
  const responseData = response.json.mock.calls[0][0]
  expect(responseData).toMatchSnapshot()
});