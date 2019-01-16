FROM ruby:2.6.0

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

ENV BUNDLE_PATH /ruby_gems

RUN mkdir /app
WORKDIR /app
ADD . /app