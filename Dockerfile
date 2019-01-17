FROM ruby:2.6.0

RUN mkdir /app
WORKDIR /app
COPY Gemfile* ./

RUN apt-get update -qq && apt-get install -y \
      libpq-dev \
      postgresql-contrib

# for a JS runtime
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

# for yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y yarn

RUN gem install bundler

RUN bundle install && rm -rf tmp/cache
COPY . .




