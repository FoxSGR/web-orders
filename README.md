
# WebOrders

This project is an application to manage shoe samples and orders.

This is a multi-project repository managed by [Nx](https://nx.dev) with an [Ionic](https://ionicframework.com/) over [Angular](https://angular.io/) front-end and [NestJS](https://nestjs.com/) back-end.

## Demo

TO-DO


## Installation

Install dependencies with pnpm:
```bash
pnpm i
```
    
## Development

Start the whole application (front- and back-end):

```bash
  pnpm run start
```


## Appendix

The goal of this project is mainly to provide a tool for SMEs in the shoe making industry to have a more organized and efficient workflow.

Here are some of the highlights of the project:

* Most logic is highly abstract
* "Keep it simple" approach to the overall structure

And some points where it could be better:

* GRASP is not well applied in a few areas, such as the back-end services, which have logic that makes them act more like a repository. This is common in simple back-end projects, but is not what I aim to implement in my projects. It was done to save time and may be reworked in the future.
* Messy code in one or two places. *When abstraction goes too far?!* Nope. It's my fault. Examples: `entity-preview-list.component.html` (webapp) and `entity.service.ts` (api).

## License

[OSL-3.0](https://opensource.org/licenses/OSL-3.0)
